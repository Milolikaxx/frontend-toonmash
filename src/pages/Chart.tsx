import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Service } from "../services/Service";
import { PictureByDateGetResponse } from "../model/picbydate_get_res";
import { IconButton, Tab, Tabs } from "@mui/material";
import RingLoader from "react-spinners/RingLoader";
import TabContext from "@mui/lab/TabContext";
import { PictureGetResponse } from "../model/pic_get_res";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import moment from 'moment';
import 'moment-timezone';
import { TabPanel } from "@mui/lab";
import { ScoreDateAgosGetResponse } from "../model/scoreagos_get_res";
import { VoteCountGetResponse } from "../model/votecount_get_res";

function ChartPage() {
  const service = useMemo(() => {
    return new Service();
  }, []);
  const pic = useRef<PictureGetResponse>();
  const pics = useRef<PictureGetResponse[]>([]);
  const picsDayAgo = useRef<PictureGetResponse[]>([]);
  const diffScore = useRef(0);
  const htrScore = useRef<PictureByDateGetResponse[]>([]);
  const picOverall = useRef<VoteCountGetResponse | undefined>(undefined);
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
        let res = await service.getAllPic();
        pics.current = res;
        res = await service.getPicRankDayAgo();
        picsDayAgo.current = res;

        const resHtr = await service.getPicScoreByDate(+id!);
        htrScore.current = resHtr;
        const pOverall = await service.getPicOverall(+id!);
        picOverall.current = pOverall;

        const createDaySt = moment(pic.current.created_at).utc().format('YYYY-MM-DD HH:mm');
        console.log(createDaySt);
        

        const createDay = new Date(createDaySt);
        const currentDate = new Date();
        console.log(createDay.getDate());
        console.log(currentDate.getDate());
        
        const daysAgo = new Date();
        daysAgo.setDate(currentDate.getDate() - 6);
        const resScore7Agos = await service.getScoreDateAgos(+id!);
        if (createDay > daysAgo) {
          daysAgo.setDate(createDay.getDate());
        }
        const score7Agos: ScoreDateAgosGetResponse = resScore7Agos!;
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
                ? score7Agos.totalScore
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
        setDateList(
          dates.length > 0 ? dates : [formatDate(new Date(currentDate))]
        );
        setScoreWinList(wScores.length > 0 ? wScores : [0]);
        setScoreLoseList(lScores.length > 0 ? lScores : [0]);
        setTotalScoreList(
          totalScores.length > 1
            ? totalScores
            : wScores.length > 0 && lScores.length > 0
            ? [1000 + wScores[0] - lScores[0]]
            : [1000]
        );

        diffScore.current =
          totalScores.length > 1
            ? totalScores.slice(-1)[0] - totalScores.slice(-2)[0]
            : wScores.length > 0 && lScores.length > 0
            ? wScores[0] - lScores[0]
            : 0;
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, service]);
  return (
    <div className="h-screen fxcenter">
      {loading ? (
        <RingLoader color="#7c3aed"/>
      ) : (
        <div className=" w-full pt-20 lg:pt-10 px-10 lg:px-44 flex flex-col justify-center items-start">
          <div className="w-full flex items-start">
            <IconButton className="mb-4" onClick={() => navigate(-1)}>
              <ArrowBackRoundedIcon sx={{ fontSize: 35 }} />
            </IconButton>
            <div className="flex items-start ms-5 mt-2 prompt-regular text-lg gap-5">
              <div className="flex items-center gap-3">
                <div className="font-bold text-violet-700">Rank</div>
                <div className="text-gray-600">{pics.current.findIndex((p) => p.pid === pic.current!.pid)+1}</div>
                {picsDayAgo.current.findIndex(
                  (p) => p.pid === pic.current!.pid
                ) >= 0 ? (
                  <>
                    {picsDayAgo.current.findIndex(
                      (p) => p.pid === pic.current!.pid
                    ) > pics.current.findIndex((p) => p.pid === pic.current!.pid) ? (
                      <div className="text-green-600 fxcenter gap-1">
                        <div className="bg-green-600 text-white w-4 h-4 fxcenter rounded-md">
                          <ArrowDropUpIcon sx={{ fontSize: 30 }} />
                        </div>

                        {Math.abs(
                          picsDayAgo.current.findIndex(
                            (p) => p.pid === pic.current!.pid
                          ) - pics.current.findIndex((p) => p.pid === pic.current!.pid)
                        )}
                      </div>
                    ) : picsDayAgo.current.findIndex(
                        (p) => p.pid === pic.current!.pid
                      ) < pics.current.findIndex((p) => p.pid === pic.current!.pid) ? (
                      <div className="text-red-600 fxcenter gap-1">
                        <div className="bg-red-600 text-white w-4 h-4 fxcenter rounded-md">
                          <ArrowDropDownIcon sx={{ fontSize: 30 }} />
                        </div>

                        {Math.abs(
                          picsDayAgo.current.findIndex(
                            (p) => p.pid === pic.current!.pid
                          ) - pics.current.findIndex((p) => p.pid === pic.current!.pid)
                        )}
                      </div>
                    ) : (
                      <div className="text-gray-500 fxcenter gap-1">
                        <div className="bg-gray-500 text-white w-4 h-4 fxcenter rounded-md">
                          <HorizontalRuleIcon sx={{ fontSize: 20 }} />
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-green-600 fxcenter gap-1">
                    <div className="bg-green-600 text-white w-4 h-4 fxcenter rounded-md">
                      <ArrowDropUpIcon sx={{ fontSize: 30 }} />
                    </div>
                    {pics.current.length - pics.current.findIndex((p) => p.pid === pic.current!.pid)}
                  </div>
                )}
              </div>
              <div className=" flex flex-col">
                <div className="flex items-center gap-3">
                  <div className="font-bold text-violet-700">Total score</div>
                  <div className="text-gray-600">{pic.current?.totalScore}</div>
                  {diffScore.current > 0 ? (
                    <div className="text-green-600 fxcenter gap-2">
                      <div className="bg-green-600 text-white w-6 h-6 fxcenter rounded-lg">
                        <ArrowDropUpIcon sx={{ fontSize: 35 }} />
                      </div>

                      {diffScore.current}
                    </div>
                  ) : diffScore.current < 0 ? (
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
                    {formatDateShow(new Date(pic.current!.created_at))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mt-2 grid grid-cols-10 gap-4">
            <div className="col-span-full lg:col-span-4 grid grid-rows-12 grid-flow-col max-h-[500px]">
              <div className="row-span-full flex justify-center">
                <img
                  src={pic.current!.img}
                  className="w-[300px] h-[300px] lg:w-full lg:h-full rounded-xl object-cover"
                />
              </div>
            </div>
            <div className="col-span-full lg:col-span-6 max-h-[250px] lg:max-h-[480px]">
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
                  <Tab value="3" label="Overall" />
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
                <TabPanel className="h-full" value="3">
                  <div className="text-xl prompt-regular text-center">
                    Overall
                  </div>
                  {picOverall.current!.win > 0 ||
                  picOverall.current!.lose > 0 ? (
                    <PieChart
                      series={[
                        {
                          data: [
                            {
                              id: 0,
                              value: picOverall.current!.win,
                              label: "Win",
                              color: "#65B741",
                            },
                            {
                              id: 1,
                              value: picOverall.current!.lose,
                              label: "Lose",
                              color: "#FF6868",
                            },
                          ],
                          highlightScope: {
                            faded: "global",
                            highlighted: "item",
                          },
                          faded: {
                            innerRadius: 30,
                            additionalRadius: -30,
                            color: "gray",
                          },
                        },
                      ]}
                    />
                  ) : (
                    <div className="text-lg prompt-regular text-center">
                      This picture has not been voted yet.
                    </div>
                  )}
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
      day: "numeric",});
  }
  function formatDateShow(date: Date): string {
    const dateUtc = moment(date).utc()
    return dateUtc.format('MMMM DD, YYYY')
  }
}
export default ChartPage;
