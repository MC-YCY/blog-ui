export function ReadTime(text: string) {
  const wordsPerMinute = 400; // 每分钟阅读字数（中文）
  const words = text.replace(/\s/g, '').length;
  const seconds = Math.ceil((words / wordsPerMinute) * 60);
  return formatTime(seconds);
}

export function formatTime(seconds: number) {
  if (seconds < 60) return `${seconds}秒`;

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes < 60) {
    return remainingSeconds
      ? `${minutes}分钟${remainingSeconds}秒`
      : `${minutes}分钟`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingSeconds
    ? `${hours}小时${remainingMinutes}分钟${remainingSeconds}秒`
    : remainingMinutes
      ? `${hours}小时${remainingMinutes}分钟`
      : `${hours}小时`;
}
