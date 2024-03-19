import { BarChart, LineChart } from "@mui/x-charts";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Service } from "../services/Service";
import { PictureByDateGetResponse } from "../model/picbydate_get_res";
import { CircularProgress, IconButton, Tab, Tabs } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import { PictureGetResponse } from "../model/pic_get_res";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { TabPanel } from "@mui/lab";
import { ScoreDateAgosGetResponse } from "../model/scoreagos_get_res";

function ChartPage() {
  const service = useMemo(() => {
    return new Service();
  }, []);
  const pic = useRef<PictureGetResponse>();
  const diffScore = useRef(0);
  const htrScore = useRef<PictureByDateGetResponse[]>([]);
  const [dateList, setDateList] = useState<string[]>([]);
  const [totalScoreList, setTotalScoreList] = useState<number[]>([]);
  const [scoreWinList, setScoreWinList] = useState<number[]>([]);
  const [scoreLoseList, setScoreLoseList] = useState<number[]>([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [value, setValue] = useState("1");

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const resPic = await service.getPicByID(+id!);
        pic.current = resPic;
        const resHtr = await service.getPicScoreByDate(+id!);
        htrScore.current = resHtr;
        const resScore7Agos = await service.getPicScore7DateAgos(+id!);
        const score7Agos: ScoreDateAgosGetResponse = resScore7Agos!;
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

          if (score) {
            totalScores.push(
              totalScores.slice(-1)[0]
                ? totalScores.slice(-1)[0] + score.totalScore
                : score7Agos
                ? score7Agos.totalScore + score.totalScore
                : 1000
            );
          } else {
            totalScores.push(
              totalScores.slice(-1)[0]
                ? totalScores.slice(-1)[0]
                : score7Agos
                ? score7Agos.totalScore
                : 1000
            );
          }
        }
        setDateList(dates);
        setScoreWinList(wScores);
        setScoreLoseList(lScores);
        setTotalScoreList(totalScores);
        diffScore.current = totalScores!.slice(-1)[0] - totalScores!.slice(-2)[0];
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, service]);
  return (
    <div className="h-screen w-screen fxcenter">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="h-full w-full pt-10 px-10 lg:px-44 flex flex-col justify-center items-start">
          <div className="w-full flex items-start">
            <IconButton className="mb-4" onClick={() => navigate(-1)}>
              <ArrowBackRoundedIcon sx={{ fontSize: 35 }} />
            </IconButton>
            <div className="ms-5 mt-2 flex flex-col prompt-regular text-lg">
              <div className="flex items-center gap-3">
                <div className="font-bold text-violet-700">Total score</div>
                <div className="text-gray-600">{pic.current?.totalScore}</div>
                {totalScoreList!.slice(-1)[0] > totalScoreList!.slice(-2)[0] ? (
                  <div className="text-green-600 fxcenter gap-2">
                    <div className="bg-green-600 text-white w-6 h-6 fxcenter rounded-lg">
                      <ArrowDropUpIcon sx={{ fontSize: 35 }} />
                    </div>

                    {diffScore.current}
                  </div>
                ) : totalScoreList!.slice(-1)[0] < totalScoreList!.slice(-2)[0] ? (
                  <div className="text-red-600 fxcenter gap-2">
                    <div className="bg-red-600 text-white w-6 h-6 fxcenter rounded-lg">
                      <ArrowDropDownIcon sx={{ fontSize: 35 }} />
                    </div>

                    {diffScore.current}
                  </div>
                ) : (
                  <div className="text-gray-500 fxcenter gap-2">
                    <div className="bg-gray-500 text-white w-6 h-6 fxcenter rounded-lg">
                      <HorizontalRuleIcon sx={{ fontSize: 20 }} />
                    </div>
                    {diffScore.current}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <div className="font-bold text-violet-700">Created At</div>
                <div className="text-gray-600">
                  {formatDate(new Date(pic.current!.created_at))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mt-96 lg:mt-0 grid grid-cols-10 gap-4">
            <div className="col-span-full lg:col-span-4 grid grid-rows-12 grid-flow-col max-h-[500px]">
              <div className="row-span-full">
                <img
                  src={pic.current!.img}
                  className="w-full rounded-xl object-cover h-full"
                />
              </div>
            </div>
            <div className="col-span-full lg:col-span-6 max-h-[480px]">
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
