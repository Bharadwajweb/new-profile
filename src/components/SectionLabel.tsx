type SectionLabelProps = {
  index: string
  label: string
  note?: string
}

export function SectionLabel({ index, label, note }: SectionLabelProps) {
  return (
    <div className="section-label">
      <span className="section-label__index">{index}</span>
      <span className="section-label__name">{label}</span>
      {note && <span className="section-label__note">{note}</span>}
    </div>
  )
}
