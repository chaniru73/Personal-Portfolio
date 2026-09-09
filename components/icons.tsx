import Image from "next/image";
import type { CSSProperties, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

type TechnologyMarkProps = {
  icon: string;
  name: string;
  color?: string;
  monochrome?: boolean;
};

export function TechnologyMark({ icon, name, color, monochrome = false }: TechnologyMarkProps) {
  return (
    <span aria-hidden="true" className="technology-mark">
      {monochrome ? (
        <span
          className="technology-logo-mask"
          title={`${name} logo`}
          style={{
            "--technology-color": color,
            "--technology-icon": `url("${icon}")`,
          } as CSSProperties}
        />
      ) : (
        <Image
          src={icon}
          alt=""
          width={56}
          height={56}
          sizes="56px"
          className="technology-logo"
          title={`${name} logo`}
        />
      )}
    </span>
  );
}

function LineIcon({ children, title, ...props }: IconProps) {
  return (
    <svg
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function CodeIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="m9 18-6-6 6-6" />
      <path d="m15 6 6 6-6 6" />
    </LineIcon>
  );
}

export function BuildIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4" />
      <path d="m15 5 4 4" />
    </LineIcon>
  );
}

export function DeployIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M12 3v12" />
      <path d="m7 8 5-5 5 5" />
      <path d="M5 15v4h14v-4" />
    </LineIcon>
  );
}

export function MonitorIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <rect x="4" y="5" width="16" height="11" rx="2" />
      <path d="M8 20h8" />
      <path d="M12 16v4" />
      <path d="m8 11 2 2 3-4 3 3" />
    </LineIcon>
  );
}

export function EducationIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="m3 8 9-4 9 4-9 4-9-4Z" />
      <path d="M7 10.2v5.1c0 1 2.2 2.7 5 2.7s5-1.7 5-2.7v-5.1" />
    </LineIcon>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5v-12Z" />
      <path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20" />
    </LineIcon>
  );
}

export function StrengthIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M12 3 4 7v6c0 4.2 3.4 6.6 8 8 4.6-1.4 8-3.8 8-8V7l-8-4Z" />
      <path d="m9 12 2 2 4-5" />
    </LineIcon>
  );
}

export function ServerIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <rect x="4" y="4" width="16" height="6" rx="2" />
      <rect x="4" y="14" width="16" height="6" rx="2" />
      <path d="M8 7h.01" />
      <path d="M8 17h.01" />
    </LineIcon>
  );
}

export function DatabaseIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
      <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </LineIcon>
  );
}

export function CloudIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M17.5 18H8a4 4 0 1 1 .5-8 5.5 5.5 0 0 1 10.7 1.7A3.2 3.2 0 0 1 17.5 18Z" />
    </LineIcon>
  );
}

export function ToolsIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="m14.5 5 4.5 4.5" />
      <path d="M16 3.5 20.5 8 9 19.5H4.5V15L16 3.5Z" />
    </LineIcon>
  );
}

export function LayersIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 16 9 5 9-5" />
    </LineIcon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.3 2.3 4.7-5" />
    </LineIcon>
  );
}

export function GitBranchIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="18" r="2" />
      <circle cx="6" cy="18" r="2" />
      <path d="M6 8v8" />
      <path d="M8 6h3a5 5 0 0 1 5 5v5" />
    </LineIcon>
  );
}

export function ExternalIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M14 4h6v6" />
      <path d="m10 14 10-10" />
      <path d="M20 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4" />
    </LineIcon>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </LineIcon>
  );
}

export function LocationIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M12 21s7-4.7 7-11a7 7 0 1 0-14 0c0 6.3 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </LineIcon>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </LineIcon>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </LineIcon>
  );
}

export function GithubLogo(props: IconProps) {
  return (
    <svg
      aria-hidden={props.title ? undefined : true}
      role={props.title ? "img" : undefined}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      {props.title ? <title>{props.title}</title> : null}
      <path d="M12 .5A11.5 11.5 0 0 0 8.36 22.9c.58.1.79-.25.79-.56v-2.02c-3.22.7-3.9-1.38-3.9-1.38-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.04 1.76 2.72 1.25 3.38.96.11-.75.41-1.25.74-1.54-2.57-.29-5.27-1.28-5.27-5.72 0-1.26.45-2.3 1.19-3.11-.12-.29-.52-1.47.11-3.07 0 0 .98-.31 3.18 1.19a10.94 10.94 0 0 1 5.8 0c2.2-1.5 3.17-1.19 3.17-1.19.64 1.6.24 2.78.12 3.07.74.81 1.18 1.85 1.18 3.11 0 4.45-2.71 5.43-5.29 5.72.42.36.79 1.07.79 2.16v3.02c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function LinkedinLogo(props: IconProps) {
  return (
    <svg
      aria-hidden={props.title ? undefined : true}
      role={props.title ? "img" : undefined}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      {props.title ? <title>{props.title}</title> : null}
      <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.68H9.34V8.98h3.42v1.57h.05a3.75 3.75 0 0 1 3.38-1.86c3.61 0 4.28 2.38 4.28 5.47v6.29h-.02ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.04H3.54V8.98H7.1v11.47ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}
