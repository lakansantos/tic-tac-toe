import Game from '../../models/gameModel.js';

const getGameController = async (req, res) => {
  try {
    const { search, limit = 5, offset = 0 } = req.query;

    const query = search
      ? { game_room_name: { $regex: new RegExp(search, 'i') } }
      : {};

    const _limit = parseInt(limit);
    const _offset = parseInt(offset);
    const response = await Game.aggregate([
      { $match: query },
      {
        $facet: {
          meta: [
            { $count: 'total_rows' },
            {
              $addFields: {
                total_pages: {
                  $ceil: {
                    $divide: ['$total_rows', _limit],
                  },
                },
                limit: _limit,
                offset: _offset,
              },
            },
          ],
          data: [
            { $sort: { created_at: -1 } },
            { $skip: _offset * _limit },
            { $limit: _limit },
          ],
        },
      },
    ]);

    const [{ meta, data = [] }] = response;
    return res.status(200).json({
      data,
      meta: meta[0] || {
        limit: limit,
        offset: _offset,
        total_pages: 0,
        total_rows: 0,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server internal error',
    });
  }
};

export default getGameController;
