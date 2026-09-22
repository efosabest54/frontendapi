import prisma from "@/prisma/prisma.connect";

export async function GET(req:Request){
    try {
        const allUser = await prisma.user.findMany();
        return Response.json(allUser)
    } catch (error) {
         return Response.json({message:"something went wrong"})
    }
}

export async function POST(req:Request){
    const body = await req.json()
    try {
        const newUser = await prisma.user.create({data:{...body}});
        return Response.json({message:"user created successfully"})
    } catch (error) {
        return Response.json({message:"something went wrong"})
    }
}

export async function PUT(req:Request){
      
       try {
         const {id, ...others}= await req.json()

        const updatedUser= await prisma.user.update({where:{id:id}, data:{...others}})
        return Response.json({message:"user updated successfully", user: updatedUser})
       } catch (error) {
        return Response.json({message:"something went wrong"})
     }
}

export async function DELETE(req:Request){
    try {
        const {id} = await req.json()

        const deleteUser = await prisma.user.delete({where:{id}, select:{id:true}})
        return Response.json({message:"user deleted successfully", user: deleteUser})
    } catch (error) {
         return Response.json({message:"something went wrong"})
    }
}