
import { tunnelRepository } from "@/lib/domain/tunnel/repositories";
import TunnelHeader from "@/lib/domain/tunnel/ui/components/tunnel-header";
import TunnelNav from "@/lib/domain/tunnel/ui/components/tunnel-nav";
import { notFound } from "next/navigation"

export default async function TunnelLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    const tunnel = await tunnelRepository.findDetailById(id)

    if (!tunnel) {
        notFound()
    }

    return (
        <div className="flex flex-col gap-6">
            <TunnelHeader tunnel={tunnel} />

            <TunnelNav tunnelId={id} />

            <div>{children}</div>
        </div>
    )
}