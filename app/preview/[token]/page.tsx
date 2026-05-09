import ClientPreviewView from "@/components/sections/ClientPreviewView";

type ClientPreviewPageProps = {
  params: Promise<{
    token: string;
  }>;
};

export default async function ClientPreviewPage({
  params,
}: ClientPreviewPageProps) {
  const { token } = await params;

  return <ClientPreviewView token={token} />;
}
