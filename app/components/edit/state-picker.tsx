import states from "@/states.json";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

import { User } from "@prisma/client";

interface StatePickerProps {
  user: Pick<User, "location">;
}

const StatePicker = ({ user }: StatePickerProps) => {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue
          placeholder={user.location ? user.location : "Sem localização"}
        />
      </SelectTrigger>
      <SelectContent>
        {states.map((state: string) => (
          <SelectItem key={state} value={state}>
            {state}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StatePicker;
