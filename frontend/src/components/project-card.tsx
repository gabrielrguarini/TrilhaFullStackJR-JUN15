import { deleteProjectById } from "@/services/project";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

type Props = {
  id: number;
  title: string;
  body: string;
};

export default function ProjectCard({ id, title, body }: Props) {
  const router = useRouter();
  const token = Cookies.get("token");
  return (
    <div
      key={`${id}`}
      className="relative max-h-40 max-w-64 overflow-hidden text-ellipsis border-2 border-primary p-2"
    >
      <button
        onClick={() => deleteProjectById(id, token!)}
        className="absolute right-1 z-50 cursor-pointer rounded-full bg-black text-primary"
      >
        <Trash />
      </button>
      <h3
        onClick={() => {
          router.push(`/admin/project/${id}`);
        }}
        className="cursor-pointer text-xl font-semibold text-primary"
      >
        {title}
      </h3>
      <p>{body}</p>
    </div>
  );
}
