import { Container } from "@nextui-org/react";

export const Layout = ({ children }) => (
  <Container fluid display="flex" justify="center" alignItems="center" as="main">
    {children}
  </Container>
);
