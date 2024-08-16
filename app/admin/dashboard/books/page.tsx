import { NoSsr } from "@mui/material";
import { TBook } from "@/app/lib/definitions";
import AdminBookList from "./AdminBookList";
import { getBookList } from "@/app/lib/actions";

export default async function Page() {
  const data: TBook[] = await getBookList();
  return (
    <div className=" grid h-full">
      <NoSsr>
        <AdminBookList data={data} />
      </NoSsr>
    </div>
  );
}
