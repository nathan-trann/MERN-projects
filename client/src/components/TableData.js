import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import { Loading } from ".";
import { HiClipboardCopy } from "react-icons/hi";

const TableData = () => {
  const { isLoading, shortUrls, fetchUrls, redirectUrl, copyToClipboard } =
    useAppContext();

  const domain = `${window.location.origin}/`;

  useEffect(() => {
    fetchUrls();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  if (shortUrls.length === 0) {
    return (
      <tr>
        <td>No URLs to display</td>
      </tr>
    );
  }

  return shortUrls.map((item, index) => {
    return (
      <tr key={item._id}>
        <td className="column1">{index + 1}</td>
        <td className="column2">
          <a href={item.fullUrl}>{item.fullUrl}</a>
        </td>
        <td className="column3">
          <button
            // href={item.shortUrl}
            // target="_blank"
            // rel="noreferrer"
            type="button"
            className="btn btn-short"
            onClick={() => redirectUrl(item.shortUrl)}
          >
            {`${domain}${item.shortUrl}`}
          </button>
          <span
            className="copy-label"
            onClick={() => copyToClipboard(`${domain}${item.shortUrl}`)}
          >
            <HiClipboardCopy />
          </span>
        </td>
        <td className="column4">{item.clicks}</td>
      </tr>
    );
  });
};

export default TableData;
