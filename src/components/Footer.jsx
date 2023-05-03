import { useI18N } from "@/context/i18n";
import { Container, Text } from "@nextui-org/react";
import Link from "next/link";

export function Footer() {
  let { t } = useI18N();

  return (
    <Container
      as="footer"
      display="flex"
      justify="space-evenly"
      css={{
        marginTop: "2rem",
      }}
    >
      <Text h6>
        {t("FOOTER_DESCRIPTION_COMICS")}{" "}
        <Link href="https://xkcd.com/" target="_blank" rel="noreferrer">
          xkcd
        </Link>
      </Text>

      <Text h6>
        {t("FOOTER_DESCRIPTION_WEBSITE")}{" "}
        <Link
          href="https://github.com/FerOuvina"
          target="_blank"
          rel="noreferrer"
        >
          Fernando Ouvi&#241;a
        </Link>
      </Text>
    </Container>
  );
}
