export function MissingContentBlock({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-sm text-gray-400">
      <div>Content Block not found:</div>
      <div>{name}</div>
    </div>
  );
}
