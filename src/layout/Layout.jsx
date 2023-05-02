import { Container } from "@nextui-org/react";

export function Layout({ children }) {
  return (
    <Container
      fluid
      display="flex"
      direction="column"
      alignItems="center"
      as="main"
    >
      {children}
    </Container>
  );
}
