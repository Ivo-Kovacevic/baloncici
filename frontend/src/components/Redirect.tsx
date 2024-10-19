import { useNavigate } from "@tanstack/react-router";

export default function Redirect() {
  const navigate = useNavigate();
  navigate({ to: "/" });
  return null;
}
