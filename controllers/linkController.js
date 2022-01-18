import ShortUrl from "../models/Links.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const createShortUrl = async (req, res) => {
  req.body.user = req.user.userId;
  const { fullUrl } = req.body;

  const isLinkAlreadyExists = await ShortUrl.findOne({
    fullUrl,
    user: req.body.user,
  });
  if (isLinkAlreadyExists) {
    throw new BadRequestError("This link has already been shortened");
  }

  const link = await ShortUrl.create(req.body);

  res.status(StatusCodes.CREATED).json({
    link: {
      fullUrl: link.fullUrl,
      shortUrl: link.shortUrl,
      clicks: link.clicks,
    },
  });
};

const getAllShortUrls = async (req, res) => {
  const queryObject = {
    user: req.user.userId,
  };
  const shortUrls = await ShortUrl.find(queryObject);
  res.status(StatusCodes.OK).json({ shortUrls });
};

const getSingleShortUrl = async (req, res) => {
  const { shortUrl } = req.params;
  const url = await ShortUrl.findOne({ shortUrl });

  if (!url) {
    throw new NotFoundError("Url does not exists");
  }

  res.status(StatusCodes.OK).json({ url });
};

const handleRedirect = async (req, res) => {
  if (req.params.shortUrl === "landing") {
    return;
  }

  if (req.params.shortUrl === "register") {
    return;
  }
  const shortUrl = await ShortUrl.findOne({ shortUrl: req.params.shortUrl });
  if (!shortUrl) {
    throw new NotFoundError("URL does not exists");
  }

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(StatusCodes.OK, shortUrl.fullUrl);
};

export { createShortUrl, getAllShortUrls, handleRedirect, getSingleShortUrl };
