"use client";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const timelineData: TimelineItem[] = [
  {
    year: "2023 - 至今",
    title: "高级前端工程师 @ XX科技",
    description: "负责核心产品前端架构设计，推动组件库和工程化建设。",
  },
  {
    year: "2021 - 2023",
    title: "前端工程师 @ YY互娱",
    description: "参与多款 Web 应用开发，深耕 React 生态和性能优化。",
  },
  {
    year: "2017 - 2021",
    title: "计算机科学 本科",
    description: "主修计算机科学，自学前端开发，参加多个开源项目。",
  },
  {
    year: "从小就...",
    title: "与代码结缘",
    description: "初中时用 FrontPage 做了第一个网页，从此对 Web 技术着迷。",
  },
];

export default function Timeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 md:-translate-x-px" />

      <div className="space-y-12">
        {timelineData.map((item, index) => (
          <div
            key={item.year}
            className={`relative pl-12 md:pl-0 md:w-1/2 ${
              index % 2 === 0 ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto"
            }`}
          >
            {/* Dot */}
            <div
              className={`absolute left-2.5 md:left-auto top-1 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-gray-950 ${
                index % 2 === 0 ? "md:right-[-0.4rem]" : "md:left-[-0.4rem]"
              }`}
            />

            <div className="glass glass-hover p-6">
              <span className="text-xs font-mono text-cyan-400">{item.year}</span>
              <h3 className="text-lg font-semibold text-white mt-1">{item.title}</h3>
              <p className="text-gray-400 text-sm mt-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
