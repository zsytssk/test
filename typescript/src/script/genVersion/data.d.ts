type Asset = {
    asset: string;
    commit: string;
    item?: Asset[];
};

type LsFile = {
    commit: string;
    file: string;
    type: FileType;
};
type LsFiles = LsFile[];

type FileType = 'js' | 'assets' | 'ui';
