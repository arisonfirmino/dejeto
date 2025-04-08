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
  value?: string;
  onChange?: (value: string) => void;
}

const StatePicker = ({ user, value, onChange }: StatePickerProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
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
