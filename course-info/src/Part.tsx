import { assertNever, type CoursePart } from "./types";

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <>
          <strong>{coursePart.name}</strong>
          <br />
          <em>{coursePart.description} </em>
          <p>project exercises {coursePart.exerciseCount}</p>
          <br />
        </>
      );

    case "group":
      return (
        <>
          <strong>{coursePart.name}</strong>
          <p>
            group {coursePart.groupProjectCount} project exercises{" "}
            {coursePart.exerciseCount}
          </p>
          <br />
        </>
      );
    case "background":
      return (
        <>
          <strong>{coursePart.name}</strong>
          <br />
          <br />
          project exercises {coursePart.exerciseCount}
          <br />
          <br />
          <a
            href={coursePart.backgroundMaterial}
            target="_blank"
            rel="noopener noreferrer"
          >
            {coursePart.backgroundMaterial}
          </a>
          <br />
          <br />
        </>
      );
    case "special":
      return (
        <>
          <strong>{coursePart.name}</strong>
          <br />
          <em>{coursePart.description} </em>
          <p>project exercises {coursePart.exerciseCount}</p>
          Requirements: {coursePart.requirements}
          <br />
        </>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;
