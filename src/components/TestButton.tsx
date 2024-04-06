import { useEffect, useState } from "react";

export default function TestButton() {
  const [content, setContent] = useState({});

  const onClick = () => {
    console.log((content as any));
  };

  const initializeData = async () => {
    fetch("/api/parse")
      .then((res) => res.json())
      .then((data: any) => {
        console.log({ data });
      });
  };

  useEffect(() => {
    initializeData();
  }, []);

  return <button onClick={onClick}>Click me</button>;
}
