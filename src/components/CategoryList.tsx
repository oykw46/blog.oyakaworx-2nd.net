import { Category } from "@/lib/client";
import styles from "./CategoryList.module.css";

type Props = {
    categories: Category[];
};

export default function CategoryList({ categories }: Props) {
    return (
        <div className={styles.wrapper}>
            <ul className={styles.list}>
                {categories.map((category) => (
                    <li key={category.id} className={styles.item}>
                        <a href={`/?category=${category.id}`} className={styles.link}>
                            {category.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}