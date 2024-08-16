import { Dialog, TextField } from "@mui/material";
import { TSelectedOwner } from "../lib/definitions";

export default function OwnerDetail({
  onClose,
  selected,
}: {
  selected: TSelectedOwner | undefined;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={!!selected}
      onClose={onClose}
      PaperProps={{ className: "" }}
      className="grid"
    >
      <div className="w-[600px] p-10 grid gap-y-4">
        <TextField
          label="Name"
          value={selected?.name}
          InputProps={{ readOnly: true }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Email Address"
          value={selected?.email}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Location"
          value={selected?.location}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Phone Number"
          value={selected?.phoneNumber}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </Dialog>
  );
}
