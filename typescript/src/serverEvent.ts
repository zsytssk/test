/** socket 名 */
export const ServerName = {
    /** 游戏的 socket */
    Game: 'game',
    /** 大厅的 socket */
    Hall: 'hall',
    /**  Arena 大厅的 socket */
    ArenaHall: 'arena_hall',
};

export const OK_CODE = 200;
export const ARENA_OK_CODE = 0;
/** socket 错误码 */
export enum ServerErrCode {
    /** token过期 */
    TokenExpire = 1002,
    /** 异地登陆 */
    OtherLogin = 1003,
    /** 已经在房间中 */
    AlreadyInRoom = 109,
    /** 余额不足 */
    NoMoney = 101,
    /** 重新带入 */
    ReExchange = 112,
    /** 需要登陆 */
    NeedLogin = 114,
    /** TrialTime - hit */
    TrialTimeGame = 117,
    /** 投币超过上限 */
    OverLimit = 121,
    /** 重新带入 */
    ToQuick = 122,
    /** TrialNotBullet */
    TrialNotBullet = 116,
    /** 大厅 room in */
    TrialTimeHall = 507,
    /** 试玩模式关闭 */
    TrialClose = 509,
    /** 在房间中报错 可能退出房间 */
    EnterGameError = 505,
    /** 网络异常 */
    NetError = 511,
    /** 维护中 */
    Maintenance = 601,
}

export type ErrorData = {
    code: number;
    error: string;
};

const CommonGameEvent = {
    /** 进入桌子 */
    TableIn: 'tableIn',
    /** 离开桌子 */
    TableOut: 'tableOut',
    /** 进入游戏 */
    EnterGame: 'enterGame',
    /** 发射子弹 */
    Shoot: 'shoot',
    /** 击中鱼 */
    Hit: 'hit',
    /** 机器人HIT */
    RobotHit: 'robotHit',
    /** 修改炮台倍数 */
    ChangeTurret: 'changeTurret',
    /** 添加鱼 */
    AddFish: 'addFish',
    /** 鱼潮来了提示 */
    FishShoalWarn: 'fishShoalWarn',
    /** 鱼潮 */
    FishShoal: 'fishShoal',
    /** 激活锁定 */
    UseLock: 'useLock',
    /** 锁定<鱼> */
    LockFish: 'lockFish',
    /** 使用炸弹 */
    UseBomb: 'useBomb',
    /** 鱼炸弹 */
    FishBomb: 'fishBomb',
    /** 使用冰冻 */
    UseFreeze: 'useFreeze',
    /** 冰冻结束 */
    FreezeOver: 'freezeOver',
    /** ？？？ */
    PowerUp: 'powerUp',
    /** 自动开炮 */
    autoShoot: 'autoShoot',
    /** 设置机器人发射命令状态 */
    SetRobotReport: 'setRobotReport',
};

/** 服务器端的接口 */
export const ServerEvent = {
    /** 游戏部分 */
    RoomIn: 'roomIn',
    RoomOut: 'roomOut',
    CheckReplay: 'checkReplay',
    /** 获取Arena的socket地址 */
    GetArenaWsUrl: 'getArenaWsUrl',

    /** 兑换子弹 */
    ExchangeBullet: 'exchangeBullet',
    /** 获取 */
    GetItemList: 'getItemList',
    /** 获取子弹列表 */
    GetBulletList: 'getBulletList',
    GetRecentBullet: 'getRecentBullet',

    ...CommonGameEvent,

    /** 其他部分 */
    ErrCode: 'conn::error',
    UserAccount: 'userAccount',
    GetDomain: 'getDomain',
    Lottery: 'lottery',
    LotteryList: 'lotteryList',
    ExchangeList: 'exchangeList',
    TicketExchange: 'ticketExchange',
    NeedEmitUser: 'needEmitUser',
    ShopList: 'shopList',
    UseSkin: 'useSkin',
    Buy: 'buy',
    /** 获取游客 TOKEN */
    GetGuestToken: 'getRequestId',
    /** 获取用户信息 */
    GetUserInfo: 'getUserInfo',
};

export const ArenaEvent = {
    /** 大厅游客 */
    Guess: 'guest',
    /** 房间状态 */
    ArenaStatus: 'arenaStatus',
    /** 赛事信息 */
    CompetitionInfo: 'competitionInfo',
    /**  排名 */
    GetDayRanking: 'getDayRanking',
    /**  名人堂 */
    GetHallOfFame: 'getHallOfFame',
    /**  总冠军 */
    MatchChampionList: 'matchChampionList',
    /**  奖励查询 */
    AwardList: 'awardList',
    /**  奖励查询-期数 */
    MatchList: 'matchList',
    /**  帮助信息 */
    GetRuleData: 'getRuleData',
    /**  报名 */
    SignUp: 'signUp',
    /**  结算 */
    GameSettle: 'gameSettle',
    /**  触发任务 */
    TriggerTask: 'triggerTask',
    /** 任务刷新 */
    TaskRefresh: 'taskRefresh',
    /** 任务完成 */
    TaskFinish: 'taskFinish',
    /**  商品列表 */
    ShopList: 'shopList',
    /**  购买商品 */
    BuyGoods: 'buyGoods',
    /**  礼品列表 */
    GiftList: 'giftList',
    /**  购买礼品 */
    BuyGift: 'buyGift',
    ...CommonGameEvent,
};
