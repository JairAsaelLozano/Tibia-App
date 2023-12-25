import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
    const data = {
        hola: "hola",
        adios: "adios"
    }
    return NextResponse.json(data);
};
