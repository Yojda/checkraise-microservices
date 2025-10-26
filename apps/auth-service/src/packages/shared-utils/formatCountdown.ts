export function formatCountdown(seconds: number): string {
    if (seconds >= 3600) {
      const hours = Math.floor(seconds / 3600);
      return `${hours}h`;
    } else if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes}min`;
    } else {
      return `${seconds}s`;
    }
}

export function getInterval(seconds: number): number {
    if (seconds >= 3600) {
        return 3600; // 1 hour
    } else if (seconds >= 60) {
        return 60; // 1 minute
    } else {
        return 1; // 1 second
    }
}