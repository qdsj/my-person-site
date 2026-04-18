"use client";

import { useState } from "react";
import { getApiUrl } from "@/lib/api";
import { ErrorCard } from "../components/error-card";
import type {
  ApiErrorState,
  OssDirectUploadResult,
  OssTempSignatureData,
  OssTempSignatureFailure,
  OssTempSignatureSuccess,
} from "../demo-types";
import { toThrownApiError } from "../demo-utils";

const AI_PARSABLE_EXTENSIONS = [
  "txt",
  "md",
  "markdown",
  "pdf",
  "doc",
  "docx",
  "ppt",
  "pptx",
  "xls",
  "xlsx",
  "csv",
  "tsv",
  "json",
  "jsonl",
  "xml",
  "html",
  "htm",
  "yaml",
  "yml",
  "rtf",
  "log",
  "js",
  "mjs",
  "cjs",
  "ts",
  "tsx",
  "jsx",
  "py",
  "java",
  "go",
  "rs",
  "c",
  "cc",
  "cpp",
  "h",
  "hpp",
  "sql",
] as const;

const ACCEPT_ATTRIBUTE = AI_PARSABLE_EXTENSIONS.map((extension) => `.${extension}`).join(",");

function getFileExtension(filename: string) {
  const segments = filename.toLowerCase().split(".");
  return segments.length > 1 ? segments[segments.length - 1] : "";
}

function sanitizeFilename(filename: string) {
  const normalized = filename
    .normalize("NFKD")
    .replace(/[^\x20-\x7E]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "");

  return normalized || "upload-file";
}

function buildObjectKey(filename: string) {
  const now = new Date();
  const year = String(now.getUTCFullYear());
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  const safeFilename = sanitizeFilename(filename);

  return `person-site/demo/${year}/${month}/${day}/${Date.now()}-${safeFilename}`;
}

function buildPublicUrl(host: string, key: string) {
  const normalizedHost = host.replace(/\/+$/g, "");
  const encodedKey = key
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${normalizedHost}/${encodedKey}`;
}

export function OssUploadPanel() {
  const [signatureStatus, setSignatureStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [signatureData, setSignatureData] = useState<OssTempSignatureData | null>(null);
  const [signatureMessage, setSignatureMessage] = useState<string>("");
  const [signatureError, setSignatureError] = useState<ApiErrorState | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">(
    "idle",
  );
  const [uploadResult, setUploadResult] = useState<OssDirectUploadResult | null>(null);
  const [uploadError, setUploadError] = useState<ApiErrorState | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);

  async function loadTempSignature() {
    setSignatureStatus("loading");
    setSignatureError(null);

    try {
      const response = await fetch(getApiUrl("/oss/getTempSignature"), {
        method: "GET",
        cache: "no-store",
      });
      const payload = (await response.json()) as
        | OssTempSignatureSuccess
        | OssTempSignatureFailure
        | Record<string, unknown>;

      if (!response.ok) {
        setSignatureData(null);
        setSignatureStatus("error");
        setSignatureError({
          statusCode: response.status,
          message: typeof payload.message === "string" ? payload.message : "Request failed.",
        });
        return null;
      }

      const status = typeof payload.status === "number" ? payload.status : 500;
      const message = typeof payload.message === "string" ? payload.message : "Request failed.";
      const data =
        typeof payload.data === "object" && payload.data !== null
          ? (payload.data as OssTempSignatureData)
          : null;

      if (status !== 200 || !data) {
        setSignatureData(null);
        setSignatureStatus("error");
        setSignatureError({
          statusCode: status,
          message,
        });
        return null;
      }

      setSignatureData(data);
      setSignatureMessage(message);
      setSignatureStatus("success");
      return data;
    } catch (caughtError) {
      setSignatureData(null);
      setSignatureStatus("error");
      setSignatureError(toThrownApiError(caughtError));
      return null;
    }
  }

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUploadError(null);
    setUploadResult(null);

    if (!selectedFile) {
      setUploadStatus("error");
      setUploadError({
        statusCode: 0,
        message: "Please choose a file first.",
        errorCode: "OSS_FILE_REQUIRED",
      });
      return;
    }

    const extension = getFileExtension(selectedFile.name);
    if (!AI_PARSABLE_EXTENSIONS.includes(extension as (typeof AI_PARSABLE_EXTENSIONS)[number])) {
      setUploadStatus("error");
      setUploadError({
        statusCode: 0,
        message: "This file type is not in the AI-parseable allowlist.",
        errorCode: "OSS_UNSUPPORTED_FILE_TYPE",
      });
      return;
    }

    setUploadStatus("uploading");

    try {
      const currentSignature = signatureData ?? (await loadTempSignature());
      if (!currentSignature) {
        setUploadStatus("error");
        return;
      }

      const key = buildObjectKey(selectedFile.name);
      const formData = new FormData();
      formData.append("key", key);
      formData.append("policy", currentSignature.policy);
      formData.append("signature", currentSignature.signature);
      formData.append("OSSAccessKeyId", currentSignature.ossAccessKeyId);
      formData.append("success_action_status", "200");
      formData.append("file", selectedFile);

      const response = await fetch(currentSignature.host, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const responseText = await response.text();
        setUploadStatus("error");
        setUploadError({
          statusCode: response.status,
          message: responseText ? responseText.slice(0, 240) : "OSS upload failed.",
        });
        return;
      }

      setUploadStatus("success");
      setUploadResult({
        ok: true,
        key,
        host: currentSignature.host,
        url: buildPublicUrl(currentSignature.host, key),
        statusCode: response.status,
      });
      setSelectedFile(null);
      setFileInputKey((value) => value + 1);
    } catch (caughtError) {
      setUploadStatus("error");
      setUploadError(toThrownApiError(caughtError));
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-black/45">OSS upload</p>
          <h2 className="display-font mt-2 text-2xl sm:text-3xl">Sign then upload from browser</h2>
        </div>
        <button
          type="button"
          onClick={() => {
            void loadTempSignature();
          }}
          className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-3 text-sm font-medium text-black/75 transition hover:bg-black/5"
        >
          拉取临时签名
        </button>
      </div>

      <div className="rounded-[24px] border border-black/8 bg-[var(--surface)] p-5 text-sm leading-7 text-black/65">
        <p className="font-medium text-black/55">API surface</p>
        <div className="mt-3 space-y-2">
          <p className="text-safe-wrap">GET {getApiUrl("/oss/getTempSignature")}</p>
          <p className="text-safe-wrap">POST {"{host}"} (direct browser upload)</p>
        </div>
      </div>

      <section className="rounded-[24px] border border-black/8 bg-white/82 p-5">
        <p className="text-sm uppercase tracking-[0.16em] text-black/45">AI parseable file types</p>
        <p className="mt-3 text-sm leading-7 text-black/65">
          {AI_PARSABLE_EXTENSIONS.map((extension) => `.${extension}`).join("  ")}
        </p>
      </section>

      {signatureStatus === "loading" ? (
        <div className="rounded-[24px] border border-dashed border-black/12 bg-[var(--surface)] p-5 text-sm leading-7 text-black/60">
          正在获取临时签名。
        </div>
      ) : null}

      {signatureStatus === "success" && signatureData ? (
        <section className="rounded-[24px] border border-black/8 bg-white/82 p-5">
          <p className="text-sm uppercase tracking-[0.16em] text-black/45">Temp signature</p>
          <div className="mt-4 space-y-2 text-sm leading-7 text-black/65">
            <p className="text-safe-wrap">message: {signatureMessage || "success"}</p>
            <p className="text-safe-wrap">host: {signatureData.host}</p>
            <p className="text-safe-wrap">ossAccessKeyId: {signatureData.ossAccessKeyId}</p>
          </div>
        </section>
      ) : null}

      {signatureError ? <ErrorCard error={signatureError} /> : null}

      <section className="rounded-[24px] border border-black/8 bg-[var(--surface)] p-5">
        <p className="text-sm uppercase tracking-[0.16em] text-black/45">Upload demo file</p>
        <form onSubmit={handleUpload} className="mt-4 space-y-4">
          <label className="block space-y-2">
            <span className="text-sm text-black/55">File</span>
            <input
              key={fileInputKey}
              type="file"
              accept={ACCEPT_ATTRIBUTE}
              onChange={(event) => {
                setUploadStatus("idle");
                setUploadError(null);
                setSelectedFile(event.target.files?.[0] ?? null);
              }}
              className="block w-full rounded-[18px] border border-black/10 bg-white/80 px-4 py-3 text-sm text-black/70 file:mr-4 file:rounded-full file:border-0 file:bg-[var(--accent)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
            />
          </label>

          {selectedFile ? (
            <div className="rounded-[18px] border border-black/8 bg-white/80 p-4 text-sm leading-7 text-black/65">
              <p className="text-safe-wrap">name: {selectedFile.name}</p>
              <p>size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
              <p className="text-safe-wrap">type: {selectedFile.type || "unknown"}</p>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={uploadStatus === "uploading"}
            className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
          >
            {uploadStatus === "uploading" ? "上传中..." : "上传到 OSS"}
          </button>
        </form>
      </section>

      {uploadStatus === "success" && uploadResult ? (
        <section className="rounded-[24px] border border-[rgba(35,118,79,0.18)] bg-[rgba(35,118,79,0.08)] p-5">
          <p className="text-sm uppercase tracking-[0.16em] text-[rgba(35,86,62,0.95)]">
            Upload success
          </p>
          <div className="mt-4 space-y-2 text-sm leading-7 text-[rgba(35,86,62,0.95)]">
            <p>statusCode: {uploadResult.statusCode}</p>
            <p className="text-safe-wrap">host: {uploadResult.host}</p>
            <p className="text-safe-wrap">key: {uploadResult.key}</p>
            <p className="text-safe-wrap">url: {uploadResult.url}</p>
          </div>
        </section>
      ) : null}

      {uploadError ? <ErrorCard error={uploadError} /> : null}
    </div>
  );
}
