import prisma from "@/prisma/prisma.connect";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const newPost = await prisma.post.create({
      data: { ...body },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  } catch (error) {
    return Response.json({ message: "something went wrong" });
  }
}

export async function GET(req: Request) {
  try {
    const getPost = await prisma.post.findMany();
    return Response.json(getPost);
  } catch (error) {
    return Response.json({
      message: "something went wrong, could not get posts",
    });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, caption } = await req.json();
    const updatedPost = await prisma.post.update({
      where: { id: id },
      data: { caption: caption },
      select: { id: true, caption: true, desc: true },
    });

    return Response.json({ message: "post updated", post: updatedPost });
  } catch (error) {
    return Response.json({
      message: "something went wrong, could not get update posts",
    });
  }
}

export async function DELETE(req: Request){
    try {
       const {id, email} = await req.json();

       const post = await prisma.post.findFirst({
        where: {
            id:id, user: {email: email}
        }
       })

       if (!post) return Response.json({message: "post not found"})

        await prisma.post.delete({where: {id:id}})
        return Response.json({message: "post deleted successfully"})
    } catch (error) {
         return Response.json({
      message: "something went wrong, could not get delete posts",
    });
  
    }
}
