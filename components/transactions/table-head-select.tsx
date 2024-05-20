import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface ITableHeadSelect {
  columnIndex: number;
  selectedColumns: Record<string, string | null>;
  onChange: (columnsIndex: number, value: string | null) => void;
}

const options = ['amount', 'payee', 'date'];

export const TableHeadSelect: React.FC<ITableHeadSelect> = (props) => {
  const { columnIndex, onChange, selectedColumns } = props;
  const currentSelection = selectedColumns[`column_${columnIndex}`];

  return (
    <Select value={currentSelection || ''} onValueChange={(value) => onChange(columnIndex, value)}>
      <SelectTrigger
        className={cn(
          'border-none bg-transparent capitalize outline-none focus:ring-transparent focus:ring-offset-0',
          currentSelection && 'text-blue-500',
        )}
      >
        <SelectValue placeholder="skip" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="skip">Skip</SelectItem>
        {options.map((option, index) => {
          const disabled =
            Object.values(selectedColumns).includes(option) &&
            selectedColumns[`column_${columnIndex}`] !== option;

          return (
            <SelectItem key={index} disabled={disabled} value={option} className="capitalize">
              {option}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
