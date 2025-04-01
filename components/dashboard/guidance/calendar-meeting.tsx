// "use client";

// import React from "react";
// import { Calendar } from "@/components/ui/calendar";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Calendar as CalendarIcon } from "lucide-react";

// const CalendarMeeting = () => {
//   const [date, setDate] = React.useState<Date | undefined>(new Date());

//   return (
//     <Card className="border-2 border-green-500/20 dark:border-green-500/10 w-full max-w-sm mx-auto">
//       <CardHeader className="">
//         <div className="flex items-center gap-2">
//           <div className="p-2 rounded-lg bg-green-500/20 dark:bg-green-500/10">
//             <CalendarIcon className="w-5 h-5 text-green-500 dark:text-green-400" />
//           </div>
//           <CardTitle className="text-xl font-semibold">
//             Schedule Meeting
//           </CardTitle>
//         </div>
//       </CardHeader>
//       <CardContent className="p-4 pt-2">
//         <div className="w-full max-w-[320px] mx-auto">
//           <Calendar
//             mode="single"
//             selected={date}
//             onSelect={setDate}
//             className="rounded-md border border-green-500/20 dark:border-green-500/10"
//             classNames={{
//               months: "flex flex-col space-y-4",
//               month: "space-y-4",
//               caption: "flex justify-center pt-1 relative items-center",
//               caption_label: "text-sm font-medium",
//               nav: "space-x-1 flex items-center",
//               nav_button:
//                 "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-green-100 dark:hover:bg-green-500/20 rounded-md transition-colors",
//               nav_button_previous: "absolute left-1",
//               nav_button_next: "absolute right-1",
//               table: "w-full border-collapse space-y-1",
//               head_row: "flex",
//               head_cell:
//                 "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
//               row: "flex w-full mt-2",
//               cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-green-100 dark:[&:has([aria-selected])]:bg-green-500/20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
//               day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-green-100 dark:hover:bg-green-500/20 rounded-md transition-colors",
//               day_selected:
//                 "bg-green-500 text-white hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600 focus:bg-green-500 focus:text-white",
//               day_today:
//                 "bg-green-100 text-green-500 dark:bg-green-500/20 dark:text-green-400",
//               day_outside: "text-muted-foreground opacity-50",
//               day_disabled: "text-muted-foreground opacity-50",
//               day_range_middle:
//                 "aria-selected:bg-green-100 dark:aria-selected:bg-green-500/20 aria-selected:text-green-500 dark:aria-selected:text-green-400",
//               day_hidden: "invisible",
//               day_range_start:
//                 "bg-green-500 text-white hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600",
//               day_range_end:
//                 "bg-green-500 text-white hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600",
//             }}
//           />
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default CalendarMeeting;
