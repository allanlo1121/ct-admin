
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"

export default function SegmentPopover() {
  return (
<Popover>
  <PopoverTrigger asChild>
    <Button size="sm">
      <Plus className="size-4" />
      新增环段
    </Button>
  </PopoverTrigger>

  <PopoverContent
    align="end"
    className="w-80"
  >
    <form className="space-y-4">
      <div>
        <h4 className="font-medium">新增环段</h4>
        <p className="text-sm text-muted-foreground">
          设置环号范围及管片环宽。
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="startRingNo">
            起始环号
          </Label>
          <Input
            id="startRingNo"
            name="startRingNo"
            type="number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endRingNo">
            结束环号
          </Label>
          <Input
            id="endRingNo"
            name="endRingNo"
            type="number"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ringWidth">
          环宽（m）
        </Label>
        <Input
          id="ringWidth"
          name="ringWidth"
          type="number"
          step="0.001"
          placeholder="1.500"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
        >
          取消
        </Button>

        <Button type="submit" size="sm">
          添加
        </Button>
      </div>
    </form>
  </PopoverContent>
</Popover>
  )
}