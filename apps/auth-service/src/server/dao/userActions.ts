// "use server";
// import {User} from "@/../packages/shared-types/User";
// import {cookies} from "next/headers";
// import {jwtVerify} from "jose";
// import {prisma} from "@/../packages/shared-utils/db";
//
// const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";
// const secret = new TextEncoder().encode(JWT_SECRET);
//
// export async function getCurrentUser(): Promise<User | null> {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;
//
//     if (!token) return null;
//
//     try {
//         const {payload} = await jwtVerify(token, secret);
//         const userDb = await prisma.users.findUnique({
//             where: {id: payload.userId as number},
//         })
//         return {
//             id: payload.userId as number,
//             username: payload.name as string,
//             email: payload.email as string,
//             role: payload.role as string,
//             lives: userDb?.lives || 0,
//             maxLives: userDb?.maxLives || 0,
//             lastLifeLostAt: userDb?.lastLifeLostAt || null,
//         };
//     } catch {
//         return null;
//     }
// }
//
//
