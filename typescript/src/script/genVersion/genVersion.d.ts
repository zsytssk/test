type BinFileInfo = {
    is_assets: boolean;
    file: string[] | string;
    assets?: string[];
};

type AssetsInfo = {
    file: string;
    commit: string;
};

type AssetsErr = {
    file?: string;
    error: string;
    files?: string[];
};
