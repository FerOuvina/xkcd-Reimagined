import { Text } from "@nextui-org/react";
import Link from "next/link";

export function Footer() {
  return (
    <>
      <footer className="footer">
        <Text className="footer__copyright">
          Comics by <Link href="https://xkcd.com/">xkcd</Link>
        </Text>

        <Text>
          Website by{" "}
          <Link href="https://github.com/FerOuvina">Fernando Ouvi&#241;a</Link>
        </Text>
      </footer>
    </>
  );
}
