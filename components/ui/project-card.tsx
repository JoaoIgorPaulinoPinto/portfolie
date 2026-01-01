import { ProjectDTO } from "@/services/UserService";

interface props {
  project: ProjectDTO;
}
export default function ProjectCard(props: props) {
  return (
    <div className="rounded-md mt-5 p-5 w-full h-fit bg-zinc-900">
      <div className="text-left flex flex-col">
        <span className="text-xl text-gray-200">{props.project.Name}</span>
        <span className="text-sm italic text-gray-400">
          {props.project.Description}
        </span>
        <a
          href={props.project.HtmlUrl}
          target="_blank"
          className="text-right text-sm text-gray-500 italic"
        >
          {props.project.HtmlUrl}
        </a>
        <div className="w-full flex flex-row gap-5 text-gray-500">
          <span className="text-xs">
            created at{" "}
            {new Date(props.project.Created_at).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
          <span className="text-xs">
            updated at{" "}
            {new Date(props.project.Updated_at).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
          <span className="text-xs">{props.project.Language}</span>
          {/* <span className="text-xs">watchers {props.project.watchers}</span> */}
        </div>
      </div>
    </div>
  );
}
