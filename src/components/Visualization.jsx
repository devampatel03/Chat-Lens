import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import "react-calendar-heatmap/dist/styles.css";

const Visualization = ({ analysis }) => {
  if (!analysis) return null;

  const { 
    content_categorization, 
    theme_detection, 
    patterns_and_relationships, 
    participant_analysis, 
    sentiment_analysis, 
    media_sharing_insights, 
    keyword_analysis
  } = analysis.chat_data_analysis;

  // Data for Content Categorization 
  const barData = content_categorization.map((category) => ({
    name: category.category,
    count: category.items.length,
  }));
  const tickCount = Math.min(barData.length, 10);

  // Data for Theme Detection 
  const pieData = theme_detection.map((theme) => ({
    name: theme,
    value: 1, 
  }));

  // Data for Participant Analysis 
  const participantData = participant_analysis.top_contributors.map((participant) => ({
    name: participant.participant,
    value: participant.message_count,
  }));

  // Data for Sentiment Analysis 
  const sentimentData = sentiment_analysis.sentiment_per_participant.map((sentiment) => ({
    name: sentiment.participant,
    positive: sentiment.positive,
    neutral: sentiment.neutral,
    negative: sentiment.negative,
  }));


  // Media Sharing Insights 
  const mediaData = [
    { name: "Images", count: media_sharing_insights.media_counts.images },
    { name: "Videos", count: media_sharing_insights.media_counts.videos },
    { name: "Audio", count: media_sharing_insights.media_counts.audio },
  ];

  // Data for Top Shared Links
  const topSharedLinks = media_sharing_insights.top_shared_links;


  // Data for Keyword Analysis 
  const keywordData = keyword_analysis.most_frequent_words.map((word) => ({
    name: word.word,
    value: word.count,
  }));

  // Data for Keyword Clusters 
  const clusterData = keyword_analysis.keyword_clusters.map((cluster) => ({
    name: cluster.cluster,
    count: cluster.keywords.length,
  }));

  


  const COLORS = ["#8884d8", "#8dd1e1", "#ffc658", "#ff8042"];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-5xl text-white font-bold text-center mb-6">Chat Analysis Dashboard</h2>


      {/* Bar Chart for Content Categorization */}
      <div className="mb-12">
        <h3 className="text-2xl mt-7 font-semibold text-amber-500 mb-4">Content Categorization :</h3>
        <div className="bg-gray-900 shadow-md p-4 rounded-lg">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart width={1000} height={400} data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" interval={0} tickCount={tickCount} angle={-7} textAnchor="end"  tick={{ fill: '#ffffff' }}/>
            <YAxis  tick={{ fill: '#ffffff' }} />
            <Legend/>
            <Tooltip contentStyle={{ backgroundColor: 'white', opacity:'0.9' ,color:'black',borderRadius: '30px'}} />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
          </ResponsiveContainer>
        </div>
      </div>



      {/* Pie Chart for Theme Detection */}
      <div className="mb-12">
        <h3 className="text-2xl mt-7 font-semibold text-amber-500 mb-4">Theme Detection :</h3>
        <div className="bg-gray-900 shadow-md p-4 rounded-lg flex justify-center">
        <ResponsiveContainer width="100%" height={400}>

          <PieChart width={400} height={400}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#8884d8" label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: 'white', opacity:'0.9' ,color:'black',borderRadius: '30px'}} />
            <Legend />
          </PieChart>
          </ResponsiveContainer>
        </div>
      </div>



      {/* Top Contributors (Pie Chart) */}
      <div className="mb-12">
        <h3 className="text-2xl mt-7 font-semibold text-amber-500 mb-4">Top Contributors :</h3>
        <div className="bg-gray-900 shadow-md p-4 rounded-lg flex justify-center">
        <ResponsiveContainer width="100%" height={400}>

          <PieChart width={400} height={400}>
            <Pie data={participantData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#82ca9d" label>
              {participantData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: 'white', opacity:'0.9' ,color:'black',borderRadius: '30px'}} />
            <Legend />
          </PieChart>
          </ResponsiveContainer>
        </div>
      </div>



      {/* Sentiment Analysis (Stacked Bar Chart) */}
      <div className="mb-12">
        <h3 className="text-2xl mt-7 font-semibold text-amber-500 mb-4">Sentiment Breakdown :</h3>
        <div className="bg-gray-900 shadow-md p-4 rounded-lg">
        <ResponsiveContainer width="100%" height={400}>

          <BarChart width={600} height={300} data={sentimentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name"  tick={{ fill: '#ffffff' }} />
            <YAxis  tick={{ fill: '#ffffff' }} />
            <Tooltip contentStyle={{ backgroundColor: 'white', opacity:'0.9' ,color:'black',borderRadius: '30px'}} />
            <Legend/>
            <Bar dataKey="positive" stackId="a" fill="#82ca9d" />
            <Bar dataKey="neutral" stackId="a" fill="#8884d8" />
            <Bar dataKey="negative" stackId="a" fill="#ff8042" />
          </BarChart>
          </ResponsiveContainer>
        </div>
      </div>




      {/* Media Sharing Insights (Bar Chart) */}
      <div className="mb-12">
        <h3 className="text-2xl mt-7 font-semibold text-amber-500 mb-4">Media Sharing Insights :</h3>
        <div className="bg-gray-900 shadow-md p-4 rounded-lg">
        <ResponsiveContainer width="100%" height={400}>

          <BarChart width={600} height={300} data={mediaData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name"  tick={{ fill: '#ffffff' }} />
            <YAxis  tick={{ fill: '#ffffff' }} />
            <Tooltip contentStyle={{ backgroundColor: 'white', opacity:'0.9' ,color:'black',borderRadius: '30px'}} />
            <Legend/>
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      

      {/* Keyword Analysis (Bar Chart) */}
      <div className="mb-12">
        <h3 className="text-2xl mt-7 font-semibold text-amber-500 mb-4">Keyword Analysis :</h3>
        <div className="bg-gray-900 shadow-md p-4 rounded-lg">
        <ResponsiveContainer width="100%" height={400}>

          <BarChart width={600} height={300} data={keywordData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: '#ffffff' }} />
            <YAxis tick={{ fill: '#ffffff' }} />
            <Tooltip contentStyle={{ backgroundColor: 'white', opacity:'0.9' ,color:'black',borderRadius: '30px'}} />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
          </ResponsiveContainer>
        </div>
      </div>



      {/* Keyword Clusters */}
      <div className="mb-12">
        <h3 className="text-2xl mt-7 font-semibold text-amber-500 mb-4">Keyword Clusters :</h3>
        <div className="bg-gray-900 shadow-md p-4 rounded-lg">
        <ResponsiveContainer width="100%" height={400}>

          <BarChart width={800} height={300} data={clusterData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: '#ffffff' }} />
            <YAxis tick={{ fill: '#ffffff' }}  />
            <Tooltip contentStyle={{ backgroundColor: 'white', opacity:'0.9' ,color:'black',borderRadius: '30px'}} />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          {keyword_analysis.keyword_clusters.map((cluster, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-300 border rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-900">{cluster.cluster}</h4>
              <p className="text-gray-800">
                Keywords:{" "}
                {cluster.keywords.map((keyword, idx) => (
                  <span key={idx} className="inline-block bg-blue-100 text-blue-700 px-2 py-1 mr-2 rounded">
                    {keyword}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>



      {/* Patterns and Relationships */}
      <div>
        <h3 className="text-2xl mt-7 font-semibold text-amber-500 mb-4">Patterns and Relationships :</h3>
        <ul className="bg-gray-300 shadow-md p-4 rounded-lg list-disc pl-6 text-gray-900">
          {patterns_and_relationships.map((pattern, index) => (
            <li key={index} className="mb-2">
              <strong className="text-gray-800">{pattern.pattern}</strong>: {pattern.description}
            </li>
          ))}
        </ul>
      </div>



      {/* Top Shared Links */}
      <div className="mb-12">
        <h3 className="text-2xl mt-7 font-semibold text-amber-500 mb-4">Top Shared Links : </h3>
        <div className="bg-gray-300 shadow-md p-4 rounded-lg">
          {topSharedLinks.length > 0 ? (
            <ul className="list-disc pl-6 text-gray-700">
              {topSharedLinks.map((link, index) => (
                <li key={index} className="mb-2">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No links shared in this chat.</p>
          )}
        </div>
      </div>


    </div>
  );
};


Visualization.propTypes = {
  analysis: PropTypes.shape({
    chat_data_analysis: PropTypes.shape({
      content_categorization: PropTypes.arrayOf(
        PropTypes.shape({
          category: PropTypes.string.isRequired,
          items: PropTypes.array.isRequired,
        })
      ).isRequired,
      theme_detection: PropTypes.arrayOf(PropTypes.string).isRequired,
      patterns_and_relationships: PropTypes.arrayOf(
        PropTypes.shape({
          pattern: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
        })
      ).isRequired,
      participant_analysis: PropTypes.shape({
        top_contributors: PropTypes.arrayOf(
          PropTypes.shape({
            participant: PropTypes.string.isRequired,
            message_count: PropTypes.number.isRequired,
          })
        ).isRequired,
        message_distribution: PropTypes.arrayOf(
          PropTypes.shape({
            participant: PropTypes.string.isRequired,
            percentage: PropTypes.number.isRequired,
          })
        ).isRequired,
      }).isRequired,
      sentiment_analysis: PropTypes.shape({
        overall_sentiment: PropTypes.shape({
          positive: PropTypes.number.isRequired,
          neutral: PropTypes.number.isRequired,
          negative: PropTypes.number.isRequired,
        }).isRequired,
        sentiment_per_participant: PropTypes.arrayOf(
          PropTypes.shape({
            participant: PropTypes.string.isRequired,
            positive: PropTypes.number.isRequired,
            neutral: PropTypes.number.isRequired,
            negative: PropTypes.number.isRequired,
          })
        ).isRequired,
      }).isRequired,
      media_sharing_insights: PropTypes.shape({
        media_counts: PropTypes.shape({
          images: PropTypes.number.isRequired,
          videos: PropTypes.number.isRequired,
          audio: PropTypes.number.isRequired,
        }).isRequired,
        top_shared_links: PropTypes.arrayOf(PropTypes.string).isRequired,
      }).isRequired,
      keyword_analysis: PropTypes.shape({
        most_frequent_words: PropTypes.arrayOf(
          PropTypes.shape({
            word: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
          })
        ).isRequired,
        keyword_clusters: PropTypes.arrayOf(
          PropTypes.shape({
            cluster: PropTypes.string.isRequired,
            keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
          })
        ).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Visualization;




