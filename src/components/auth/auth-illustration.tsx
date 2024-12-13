export function AuthIllustration() {
  return (
    <>
      <div className="absolute inset-0 bg-midnight-800" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      <div className="absolute right-0 top-0 -mt-16 h-48 w-48 rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute right-36 top-0 mt-8 h-24 w-24 rounded-full bg-indigo-500/20 blur-2xl" />
      <div className="absolute left-0 top-0 h-48 w-48 rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute left-0 bottom-0 h-32 w-32 rounded-full bg-indigo-500/20 blur-2xl" />
      <div className="absolute left-0 right-0 top-0 bg-gradient-to-b from-midnight-800 to-transparent h-20 z-10" />
      <div className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-midnight-800 to-transparent h-20 z-10" />
    </>
  );
}
