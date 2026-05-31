import styles from "./HeaderTitle.module.css";

type Props = {
    title: string;
};

export default function HeaderTitle({ title }: Props) {
    return (
        <h1 className={styles.title}>
            {title}
        </h1>
    );
}