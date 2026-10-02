import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      id: string;
      role: "CLIENT" | "ADMIN";
      email: string;
    };

    user: {
      id: string;
      role: "CLIENT" | "ADMIN";
      email: string;
    };
  }
}
