import { BarChart, LineChart } from "@mui/x-charts";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserService } from "../services/userService";
import { PictureByDateGetResponse } from "../model/picbydate_get_res";
import { CircularProgress, IconButton, Tab, Tabs } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import { PictureGetResponse } from "../model/pic_get_res";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { TabPanel } from "@mui/lab";

function ChartPage() {
  const userService = useMemo(() => {
    return new UserService();
  }, []);
  const pic = useRef<PictureGetResponse>();
  const htrScore = useRef<PictureByDateGetResponse[]>([]);
  const [dateList, setDateList] = useState<string[]>([]);
  const [totalScoreList, setTotalScoreList] = useState<number[]>([]);
  const [scoreWinList, setScoreWinList] = useState<number[]>([]);
  const [scoreLoseList, setScoreLoseList] = useState<number[]>([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const resPic = await userService.getPicByID(+id!);
        pic.current = resPic;
        const resHtr = await userService.getPicScoreByDate(+id!);
        htrScore.current = resHtr;

        const currentDate = new Date();
        const daysAgo = new Date();
        daysAgo.setDate(currentDate.getDate() - 6);
        const createDay = new Date(pic.current.created_at);
        if (createDay > daysAgo) {
          daysAgo.setDate(createDay.getDate());
        }
        const dates = [];
        const totalScores: number[] = [];
        const wScores: number[] = [];
        const lScores: number[] = [];
        // ลูป 6 วันก่อนถึงวันนี้
        for (
          let date = daysAgo;
          date <= currentDate;
          date.setDate(date.getDate() + 1)
        ) {
          dates.push(formatDate(new Date(date)));
          const score = htrScore.current.find(
            (score) =>
              formatDate(new Date(score.date)) == formatDate(new Date(date))
          );
          wScores.push(score ? score.scoreWin : 0);
          lScores.push(score ? Math.abs(score.scoreLose) : 0);
          totalScores.push(
            score
              ? 1000 + score.totalScore
              : totalScores.slice(-1)[0]
              ? totalScores.slice(-1)[0]
              : 1000
          );
        }
        setDateList(dates);
        setScoreWinList(wScores);
        setScoreLoseList(lScores);
        setTotalScoreList(totalScores);
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
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="h-full w-full px-10 lg:px-44 flex flex-col justify-center items-start">
          <IconButton className="mb-4" onClick={() => navigate(-1)}>
            <ArrowBackRoundedIcon sx={{ fontSize: 35 }} className="" />
          </IconButton>

          <div className="w-full mt-96 lg:mt-0 grid grid-cols-10 gap-4">
            <div className="col-span-full lg:col-span-4 grid grid-rows-12 grid-flow-col max-h-[550px]">
              <div className="row-span-full">
                <img
                  src={pic.current!.img}
                  className="w-full rounded-xl object-cover h-full"
                />
              </div>
            </div>
            <div className="col-span-full lg:col-span-6 max-h-[520px]">
              <TabContext value={value}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  centered
                >
                  <Tab value="1" label="Score" />
                  <Tab value="2" label="Total score" />
                  <Tab value="3" label="Item Three" />
                </Tabs>
                <TabPanel className="h-full" value="1">
                  <div className="text-xl prompt-regular text-center">
                    Score increase - decrease 7 days ago
                  </div>
                  <BarChart
                    xAxis={[{ scaleType: "band", data: dateList }]}
                    series={[
                      {
                        label: "Increase",
                        color: "#65B741",
                        data: scoreWinList,
                      },
                      {
                        label: "Decrease",
                        color: "#FF6868",
                        data: scoreLoseList,
                      },
                    ]}
                  />
                </TabPanel>
                <TabPanel className="h-full" value="2">
                  <div className="text-xl prompt-regular text-center">
                    Total score 7 days ago
                  </div>
                  <LineChart
                    xAxis={[{ scaleType: "band", data: dateList }]}
                    series={[
                      {
                        label: "Total score",
                        color: "#7C3AED",
                        data: totalScoreList,
                      },
                    ]}
                  />
                </TabPanel>
              </TabContext>

              {/* <div className="row-span-2">
                <div className="text-xl prompt-regular text-center">
                  Score increase - decrease 7 days ago
                </div>
                <BarChart
                  xAxis={[{ scaleType: "band", data: dateList }]}
                  series={[
                    { label: "Increase", color: "#65B741", data: scoreWinList },
                    { label: "Decrease", color: "#FF6868", data: scoreLoseList },
                  ]}
                />
              </div>
              <div className="row-start-4 row-span-2">
                <div className="text-xl prompt-regular text-center">
                  Total score 7 days ago
                </div>
                <LineChart
                  xAxis={[{ scaleType: "band", data: dateList }]}
                  series={[
                    {
                      label: "Total score",
                      data: totalScoreList,
                    },
                  ]}
                />
              </div> */}
            </div>
          </div>
        </div>
      )}
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
