export default function Orbs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="orb -top-36 -left-32 h-[480px] w-[480px] bg-primary" />
      <div className="orb -right-24 -bottom-32 h-[420px] w-[420px] bg-accent [animation-delay:-7s]" />
      <div className="orb top-[45%] left-[55%] h-[300px] w-[300px] bg-pink opacity-10 [animation-delay:-14s]" />
    </div>
  );
}
