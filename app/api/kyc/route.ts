import prisma from "@/prisma/prisma.connect";

export async function GET(req: Request) {
  const Search = new URL(req.url);
  const id = Search.searchParams.get("kycid");

  try {
    const getKyc = await prisma.kyc.findUnique({
      where: { id: id! },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return Response.json(getKyc);
  } catch (error) {
    return Response.json({ message: "something went wrong" });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, password } = await req.json();

    const updateKyc = await prisma.kyc.update({
      where: { id: id },
      data: { password },
    });
    return Response.json({
      message: "KYC updated successfully, kyc: updatedKyc",
    });
  } catch (error) {
    return Response.json({ message: "something went wrong" });
  }
}
