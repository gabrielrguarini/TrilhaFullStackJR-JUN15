import { deleteProjectById } from "@/services/project";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";

type Props = {
  id: string;
  title: string;
  body: string;
  setProjects: Dispatch<
    SetStateAction<
      {
        title: string;
        body: string;
        id: string;
      }[]
    >
  >;
};

export default function ProjectCard({ id, title, body, setProjects }: Props) {
  const router = useRouter();
  const token = Cookies.get("token");
  const onDelete = async (id: string, token: string) => {
    const res = await deleteProjectById(id, token);
    if ("error" in res) {
      return res.error;
    }
    setProjects((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };
  return (
    <div
      key={`${id}`}
      className="relative max-h-40 max-w-64 overflow-hidden border-2 border-primary p-2"
    >
      <button
        onClick={() => onDelete(id, token!)}
        className="absolute right-1 z-50 cursor-pointer rounded-full bg-white p-1 text-primary hover:bg-primary hover:text-black"
      >
        <Trash />
      </button>
      <h3
        onClick={() => {
          router.push(`/admin/project/${id}`);
        }}
        className="cursor-pointer truncate text-xl font-semibold text-primary"
      >
        {title}
      </h3>
      <p className="text-ellipsis">{body}</p>
    </div>
  );
}
