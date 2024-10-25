import { useRouter } from "next/navigation";

type Props = {
  id: number;
  title: string;
  body: string;
};

export default function ProjectCard({ id, title, body }: Props) {
  const router = useRouter();
  console.log(id);
  return (
    <div
      onClick={() => {
        router.push(`/admin/project/${id}`);
      }}
      key={`${id}`}
      className="max-h-40 max-w-64 cursor-pointer overflow-hidden text-ellipsis border-2 border-primary p-2"
    >
      <h3 className="text-xl font-semibold text-primary">{title}</h3>
      <p>{body}</p>
    </div>
  );
}
