export interface ICountdown {
  seconds: number;
  secondsRemaining: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;
  displayDate: string;
  daysLeft: string; 
}