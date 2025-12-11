import { ProjectDTO } from "@/services/UserService";

interface props {
  project: ProjectDTO;
}
export default function ProjectCard(props: props) {
  return (
    <div className="rounded-md mt-5 p-5 w-full h-fit bg-zinc-900">
      <div className="text-left flex flex-col">
        <span className="text-xl text-gray-200">{props.project.name}</span>
        <span className="text-sm italic text-gray-400">
          {props.project.description}
        </span>
        <a
          href={props.project.htmlUrl}
          target="_blank"
          className="text-right text-sm text-gray-500 italic"
        >
          {props.project.htmlUrl}
        </a>
        <div className="w-full flex flex-row gap-5 text-gray-500">
          <span className="text-xs">
            created at{" "}
            {new Date(props.project.created_at).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
          <span className="text-xs">
            updated at{" "}
            {new Date(props.project.updated_at).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
          <span className="text-xs">{props.project.language}</span>
          {/* <span className="text-xs">watchers {props.project.watchers}</span> */}
        </div>
      </div>
    </div>
  );
}
