import { BarChart } from "@mui/x-charts";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { UserService } from "../services/userService";

function ChartPage() {
  const userService = useMemo(() => {
    return new UserService();
  }, []);
  const pic = useRef<UserGetPostResponse>();
  const [dateList, setDateList] = useState<string[]>([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await userService.getByID(+id!);

        const currentDate = new Date();
        const sevenDaysAgo = new Date(currentDate);
        sevenDaysAgo.setDate(currentDate.getDate() - 7);
        const dates = [];
        // ลูปวันที่ 7 วันก่อนจนถึงวันนี้
        for (
          let date = sevenDaysAgo;
          date <= currentDate;
          date.setDate(date.getDate() + 1)
        ) {
          dates.push(formatDate(new Date(date)));
        }
        setDateList(dates);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, userService]);
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <BarChart
        xAxis={[{ scaleType: "band", data: dateList }]}
        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }]}
        // width={500}
      />
    </div>
  );
  function formatDate(date: Date): string {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}
export default ChartPage;
