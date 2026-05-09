import Link from "next/link";
import { IconAnchor } from "@tabler/icons-react";

type LogoProps = {
  href?: string;
  compact?: boolean;
};

const Logo = ({ href = "/", compact = false }: LogoProps) => {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-dockit-heading transition-colors duration-150 ease-in-out hover:text-dockit-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dockit-blue"
    >
      <span className="grid size-7 place-items-center rounded-md border-[0.5px] border-dockit-border-emphasis bg-white">
        <IconAnchor className="size-4" stroke={1.8} />
      </span>
      {!compact && <span className="text-base font-bold">Dockit</span>}
    </Link>
  );
};

export default Logo;
