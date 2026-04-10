import { notFound } from "next/navigation";
import { ChatPage } from "@/components/page/chat";
import { hasLocale } from "@/lib/i18n";

export default async function Chat({ params }: { params: Promise<{ lang: string }> }) {
	const { lang } = await params;

	if (!hasLocale(lang)) {
		notFound();
	}

	return <ChatPage locale={lang} />;
}
