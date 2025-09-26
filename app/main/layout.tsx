import Navbar from "@/components/Navbar";

export default function MainLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
