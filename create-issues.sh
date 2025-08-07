while IFS= read -r line; do
  [[ "$line" == title::*:* ]] && title="${line#title:::}"
  [[ "$line" == body::*:* ]] && body="${line#body:::}"
  [[ "$line" == label::*:* ]] && label="${line#label:::}" && \
  gh issue create --title "$title" --body "$body" --label "$label"
done < issues-nestjs.txt

